
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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


})