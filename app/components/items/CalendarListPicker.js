import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { CalendarList, LocaleConfig } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import 'moment/locale/tr'  // moment türkçe dili için gerekli


import H1 from "../text/H1";
import colors from "../../config/colors";
import tasks from "../../values/tasks";

// react-native-calendars türkçe konfigrasyon ayarlarım
LocaleConfig.locales['tr'] = {
  monthNames: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'],
  monthNamesShort: ['Ocak','Şubat','Mart','Nisan','Mayıs','Haz.','Tem.','Ağu.','Eylül','Ekim','Kasım','Ara.'],
  dayNames: ['Pazar','Pazartesi','Salı','Çarşamba','Perşembe','Cuma','Cumartesi'],
  dayNamesShort: ['Pazar.','Pzt.','Salı','Çarş.','Perş.','Cuma.','Cmt.'],
  today: 'Bugün'
};
LocaleConfig.defaultLocale = 'tr';

function CalendarListPicker({ onClosePress, onDayPress, style, selectedDay }) {
    moment.locale('tr');
    const markedTaskDate = {};
    markedTaskDate[selectedDay] = { selected: true };
    for (let i in tasks) {
        if (
            selectedDay === moment(tasks[i].date).format("YYYY-MM-DD") &&
            tasks[i].status === "waiting"
        )
            markedTaskDate[selectedDay] = {
                selected: true,
                marked: true,
            };
        else if (tasks[i].status === "waiting")
            markedTaskDate[moment(tasks[i].date).format("YYYY-MM-DD")] = {
                marked: true,
            };
    }
    return (
        <>
            <View style={styles.headerModal}>
                <H1>Takvim</H1>
                <TouchableOpacity
                    onPress={onClosePress}
                    style={styles.closeModal}
                >
                    <MaterialIcons
                        name="close"
                        size={20}
                        color={colors.medium}
                    />
                </TouchableOpacity>
            </View>
            <View style={[style, styles.calendarListContainer]}>
                <CalendarList
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    /*onVisibleMonthsChange={(months) => {
                            console.log("now these months are visible", months);
                        }}*/
                    onDayPress={onDayPress}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={true}
                    //...calendarParams
                    style={{
                        borderTopLeftRadius: 50,
                        borderTopRightRadius: 50,
                    }}
                    markedDates={markedTaskDate}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    headerModal: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 30,
        paddingTop: 0,
    },
    calendarListContainer: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        shadowRadius: 15,
    },
});

export default CalendarListPicker;
