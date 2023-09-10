import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import moment from "moment";

const DateSelect = ({ date, setDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const changeDate = (dt) => {
    setDate(dt);
    toggleCalendar();
    console.log("Selected Date:", date);
  };

  const viewDate = moment(date, "YYYY/MM/DD").format("DD MMM, YYYY");

  return (
    <TouchableWithoutFeedback onPress={toggleCalendar}>
      <View>
        {showCalendar && (
          <DatePicker
            options={{
              backgroundColor: "#FFF",
              textHeaderColor: "#000",
              textDefaultColor: "#000",
              selectedTextColor: "#000",
              mainColor: "#DCCEBE",
              textSecondaryColor: "#000",
              borderColor: "rgba(122, 146, 165, 0.1)",
            }}
            current={date}
            selected={date}
            onDateChange={changeDate}
            mode="calendar"
            style={{ borderRadius: 8 }}
          />
        )}
        <Text style={{ backgroundColor: "#FFF", height: 60 }}>{viewDate}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DateSelect;
