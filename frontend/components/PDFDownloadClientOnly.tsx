import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: 'Times-Roman',
    position: 'relative'
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 30,
    objectFit: 'contain',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    textAlign: 'center',
  },
  date: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  labelBlock: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontFamily: 'Times-Bold',
    width: '35%',
  },
  value: {
    width: '65%',
  },
  paragraph: {
    marginBottom: 12,
  },
  bullet: {
    marginLeft: 12,
    marginBottom: 6,
  },
  footer: {
    position: 'absolute',
    fontSize: 9,
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'grey'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 20,
    right: 40,
    textAlign: 'right',
    color: 'grey'
  }
});

const PferdeWertPDF = ({ markdownData }: { markdownData: string }) => {
  const lines = markdownData.split('\n').filter(line => line.trim() !== '');

  const renderContent = () => {
    return lines.map((line, idx) => {
      if (line.startsWith('###')) {
        return <Text key={idx} style={styles.heading}>{line.replace('###', '').trim()}</Text>;
      } else if (/\*\*.*\*\*:/.test(line)) {
        const [label, value] = line.replace(/\*\*/g, '').split(':');
        return (
          <View key={idx} style={styles.labelBlock}>
            <Text style={styles.label}>{label.trim()}:</Text>
            <Text style={styles.value}>{value.trim()}</Text>
          </View>
        );
      } else if (/^\*\*(.+)\*\*$/.test(line)) {
        return <Text key={idx} style={{ fontFamily: 'Times-Bold' }}>{line.replace(/\*\*/g, '').trim()}</Text>;
      } else if (line.startsWith('-')) {
        return <Text key={idx} style={styles.bullet}>{line}</Text>;
      } else {
        return <Text key={idx} style={styles.paragraph}>{line}</Text>;
      }
    });
  };

  const today = new Date().toLocaleDateString('de-DE');

  return (
    <Document title="PferdeWert-Analyse">
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} fixed>
          {/* @react-pdf/renderer unterstützt kein echtes "alt", aber Sie können ein unsichtbares Text-Element hinzufügen */}
          <Image src="/logo.png" style={styles.logo} />
          <Text style={{ fontSize: 0, height: 0, width: 0, opacity: 0, position: 'absolute' }}>
        PferdeWert Logo
          </Text>
          <Text style={styles.title}>PferdeWert-Analyse</Text>
        </View>
        <Text style={styles.date}>Stand: {today}</Text>
        {renderContent()}
        <Text style={styles.footer} fixed>
          © Erstellt durch PferdeWert AI von www.pferdewert.de – dies ist keine verbindliche Wertermittlung.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
};

export default PferdeWertPDF;
