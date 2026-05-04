import { Container, Row, Col, Card } from "react-bootstrap";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function App() {

  const codigo = `
df = pd.read_csv("delitos.csv", sep=";")

# quitamos espacios, pasamos a mayusculas y nos quedamos solo con mes y año 
# porque queremos analizar la evolucion temporal
df.columns = df.columns.str.strip().str.upper()
df = df[["AÑO", "MES"]]

# pasamos los meses a numeros para usar ml
mes_map = {"ENERO": 1, "FEBRERO": 2, "MARZO": 3, "ABRIL": 4, "MAYO": 5, "JUNIO": 6, "JULIO": 7, "AGOSTO": 8, "SEPTIEMBRE": 9, "OCTUBRE": 10, "NOVIEMBRE": 11, "DICIEMBRE": 12}
df["MES"] = df["MES"].map(mes_map)
df = df.dropna()

# queremos saber delitos por mes asi que agrupamos por año y mes, 
# contamos cantidad de registros y ordenamos cronologicamente
df_g = df.groupby(["AÑO", "MES"]).size().reset_index(name="cantidad")
df_g = df_g.sort_values(["AÑO", "MES"]).reset_index(drop=True)

# creamos columnas guardando los delitos de los ultimos 3 meses
df_g["hace_1mes"] = df_g["cantidad"].shift(1)
df_g["hace_2mes"] = df_g["cantidad"].shift(2)
df_g["hace_3mes"] = df_g["cantidad"].shift(3)
df_g = df_g.dropna()

# no usamos año porque el modelo puede interpretar que los delitos aumentan con el paso del tiempo
X = df_g[["MES", "hace_1mes", "hace_2mes", "hace_3mes"]]
y = df_g["cantidad"]

# dividmos usando una relacion de 80% datos y 20% para test respetando el orden temporal
split = int(len(df_g) * 0.8)
X_train = X[:split]
X_test = X[split:]
y_train = y[:split]
y_test = y[split:]
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
mae = round(mean_absolute_error(y_test, y_pred), 2)
r2 = round(r2_score(y_test, y_pred), 2)

# usamos los ultimos datos para construir el input del proximo mes y hacer la prediccion
ultimo = df_g.iloc[-1]
nuevo = pd.DataFrame({
    "MES": [ultimo["MES"] + 1 if ultimo["MES"] < 12 else 1],
    "hace_1mes": [ultimo["cantidad"]],
    "hace_2mes": [ultimo["hace_1mes"]],
    "hace_3mes": [ultimo["hace_2mes"]]
})
pred = int(model.predict(nuevo)[0])
`;

  return (
    <div>
      <Container className="py-5">
        <Row className="mb-5">
          <Col>
            <h1>Predicción de Delitos en Uruguay</h1>
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-sm border-0">
              <Card.Body className="text-center">
                <img
                  src="/delitos.png"
                  alt="Gráfico delitos"
                  className="img-fluid rounded"
                  style={{ maxHeight: "400px", objectFit: "contain" }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={9} lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <p className="text-muted">
                  Este proyecto lo hice con la idea de ver si podía predecir la cantidad de delitos por mes en Uruguay usando machine learning, pero tratando de mantenerlo lo más simple posible.
                </p>
                <p className="text-muted">
                  Partí de datos reales, los limpié un poco y los agrupé por mes para tener una serie temporal y a partir de eso armé variables usando lo que había pasado en los meses anteriores, básicamente para que el modelo tenga algo de contexto y no esté mirando solo el presente.
                </p>
                <p className="text-muted">
                  Use una regresión lineal porque era suficiente para este problema y además me permitía entender bien cómo estaba tomando decisiones el modelo ya que no era la idea hacer algo súper complejo sino algo que tenga sentido.
                </p>
                <p className="text-muted">
                  El modelo termina con un error promedio de 654 y un R² de 0.27 que no es espectacular, pero es bastante razonable considerando que los datos tienen bastante ruido y cambios que no son fáciles de anticipar.
                </p>
                <p className="text-muted">
                  Con ese modelo, la predicción para el próximo mes queda en aproximadamente 13.943 delitos, que obviamente no es algo exacto, pero sirve como una aproximación basada en el comportamiento reciente.
                </p>
                <p className="text-muted mb-0">
                  También probé agregar homicidios como variable extra para ver si aportaba algo más de información, pero no cambió prácticamente nada en los resultados, así que decidí no incluirlo en la versión final.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h4 className="mb-3">Código del modelo (Python)</h4>
                <SyntaxHighlighter language="python" style={oneDark}>
                  {codigo}
                </SyntaxHighlighter>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
