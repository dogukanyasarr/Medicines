import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f8fc',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#13aff9',
    shadowColor: '#13aff9',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    backgroundColor: '#f4f8fc',
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 34,
    height: 34,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#13aff9',
    flex: 1,
    textAlign: 'center',
  },
  userIcon: {
    width: 36,
    height: 36,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  drugItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#13aff9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#13aff9',
    justifyContent: 'space-between',
  },
  drugItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  drugIcon: {
    width: 40,
    height: 40,
    marginRight: 16,
    tintColor: '#13aff9',
  },
  drugName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  removeButton: {
    padding: 8,
  },
  removeIcon: {
    width: 24,
    height: 24,
    borderRadius : 100,
  },
});
