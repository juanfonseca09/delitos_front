import { Container, Row, Col, Card } from "react-bootstrap";

export default function App() {

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
                  El modelo termina con un error promedio de 654 y explica un 27% la variabilidad de los datos, que no es espectacular, pero es bastante razonable considerando que los datos tienen bastante ruido y cambios que no son fáciles de anticipar.
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
      </Container>
    </div>
  );
}
