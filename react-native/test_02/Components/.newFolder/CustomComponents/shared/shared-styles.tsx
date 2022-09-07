import { StyleSheet } from "react-native";

export const CustomStyle = StyleSheet.create({

    row:{
        alignSelf: 'center',
        display:'flex',
        flexFlow: 'row wrap',
        width: '100%',
    },

    rowInput:{
        alignSelf: 'center',
        display:'flex',
        flexFlow: 'row wrap',
        width: '100%',
        justifyContent: 'space-between',
    },

    cardsContainer:{
        alignSelf: 'center',
        display:'flex',
        flexFlow: 'row wrap',
        width: '100%',
        justifyContent: 'space-evenly',
    },
});