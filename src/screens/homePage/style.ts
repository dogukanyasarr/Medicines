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
    marginBottom: 18,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#13aff9',
  },
  userImage: {
    width: 36,
    height: 36,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    width: 36,
    height: 36,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderColor: '#13aff9',
    backgroundColor: '#fff',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#13aff9',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 8,
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
    flexWrap: 'wrap',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  actionButton: {
    marginLeft: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
    borderRadius: 150,
  },
  loadingContainer: {
    flex: 1,
  },
});
