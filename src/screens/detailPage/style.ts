import { StyleSheet } from 'react-native';

export const LABEL_BG = '#d0e6fa';
export const LABEL_BORDER = '#5a9bd8';
export const VALUE_BG = '#f0e6ff';
export const VALUE_BORDER = '#b48ee6';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8fc',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 18,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelBg: {
    backgroundColor: LABEL_BG,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: LABEL_BORDER,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginRight: 6,
    minWidth: 90,
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2561a7',
  },
  valueBg: {
    backgroundColor: VALUE_BG,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: VALUE_BORDER,
    paddingVertical: 7,
    paddingHorizontal: 12,
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    color: '#5a3a7a',
  },
});
