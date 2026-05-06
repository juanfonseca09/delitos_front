import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import "./App.css";

export default function App() {
  return (
    <div className="app-bg">
      <Container className="py-5">
        <Row className="mb-5 text-center text-white">
          <Col>
            <h1 className="fw-bold text-uppercase">
              Predicción de Delitos en Uruguay
            </h1>
          </Col>
        </Row>
        <Row className="mb-4 justify-content-center">
          <Col md={10}>
            <Card className="project-card shadow-sm border-0">
              <Card.Body>
                <p className="text-muted">
                  Este proyecto lo hice con la idea de ver si podía predecir la cantidad de delitos por mes en Uruguay usando machine learning, pero tratando de mantenerlo lo más simple posible.
                </p>
                <p className="text-muted">
                  Partí de datos reales, los limpié un poco y los agrupé por mes para tener una serie temporal y a partir de eso armé variables usando lo que había pasado en los meses anteriores, básicamente para que el modelo tenga algo de contexto y no esté mirando solo el presente.
                </p>
                <p className="text-muted">
                  Además, exporté los resultados para construir visualizaciones y dashboards interactivos en Power BI, comparando valores reales y predicciones del modelo a lo largo del tiempo.
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
                <p className="text-muted mb-3">
                  También probé agregar homicidios como variable extra para ver si aportaba algo más de información, pero no cambió prácticamente nada en los resultados, así que decidí no incluirlo en la versión final.
                </p>
                <a
                  href="https://github.com/juanfonseca09/delitos/blob/main/delitos.ipynb"
                  target="_blank"
                  rel="noreferrer"
                  className="github-btn"
                >
                  <FaGithub style={{ marginRight: "6px" }} />
                  Ver código
                </a>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-5 justify-content-center">
          <Col md={10}>
            <Card className="project-card shadow-sm border-0">
              <Card.Body className="text-center">
                <img
                  src="/delitos.png"
                  alt="grafico"
                  className="img-fluid rounded"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}