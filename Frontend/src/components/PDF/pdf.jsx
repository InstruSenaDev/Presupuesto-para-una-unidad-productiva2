import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import usePresupuesto from "./usePresupuesto"; // Importamos el hook

// Definimos los estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    margin: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    padding: 5,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
});

// Componente que define el contenido del PDF
const InformePDFDocument = ({ informe }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Informe de Movimientos</Text>

      {/* Ingresos */}
      <View style={styles.section}>
        <Text>Ingresos</Text>
        <View style={styles.table}>
          {informe?.ingresos?.map((ingreso, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{ingreso.descripcion}</Text>
              <Text style={styles.tableCell}>{ingreso.monto}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Egresos */}
      <View style={styles.section}>
        <Text>Egresos</Text>
        <View style={styles.table}>
          {informe?.egresos?.map((egreso, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{egreso.descripcion}</Text>
              <Text style={styles.tableCell}>{egreso.monto}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Resumen */}
      <View style={styles.section}>
        <Text>Total de Ingresos: {informe?.totalIngresos}</Text>
        <Text>Total de Egresos: {informe?.totalEgresos}</Text>
        <Text>Saldo Total: {informe?.saldoTotal}</Text>
      </View>
    </Page>
  </Document>
);

const InformePDF = () => {
  const { informe, obtenerInformeMovimientos } = usePresupuesto(); // Usamos el hook

  useEffect(() => {
    obtenerInformeMovimientos(); // Obtenemos el informe al cargar el componente
  }, []);

  return (
    <div>
      {informe ? (
        <PDFDownloadLink
          document={<InformePDFDocument informe={informe} />}
          fileName="informe_movimientos.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Generando PDF..." : "Descargar PDF"
          }
        </PDFDownloadLink>
      ) : (
        <p>Cargando informe...</p>
      )}
    </div>
  );
};

export default InformePDF;
