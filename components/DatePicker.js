import {
  registerTranslation,
} from 'react-native-paper-dates';

import { DatePickerModal } from 'react-native-paper-dates';
import { useState, useCallback } from 'react';
import { TouchableOpacity, View,StyleSheet } from 'react-native';
import { Text } from './Themed';
import { formatDate, VietNameseDate } from '../utils/DateHelper';
import { useStyle } from '../utils/style';
registerTranslation("vi", {
  save: 'Đồng ý',
  selectSingle: 'Chọn ngày',
  selectMultiple: 'Chọn các ngày',
  selectRange: 'Chọn khoảng thời gian',
  notAccordingToDateFormat: (inputFormat) =>
    `Số ngày phải khớp với: ${inputFormat}`,
  mustBeHigherThan: (date) => `Nên chọn ngày sau: ${date}`,
  mustBeLowerThan: (date) => `Nên chọn ngày trước: ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Chọn ngày giữa ${startDate} - ${endDate}`,
  dateIsDisabled: 'Ngày không hợp lệ',
  previous: 'Trước',
  next: 'Tiếp',
  typeInDate: 'Nhập ngày',
  pickDateFromCalendar: 'Chọn ngày trong lịch',
  close: 'Đóng',
});

/**
 * 
 * @param {validRange} param0 
 * ex: {
 *       startDate: new Date(2021, 1, 2),  // optional
 *       endDate: new Date(), // optional
 *       disabledDates: [new Date()] // optional
 *     }
 *
 * @returns 
 */

function DatePicker({ placeHolder = "Chọn ngày", validRange, onConfirm, disabled }) {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      onConfirm && onConfirm(formatDate(params.date));
    },
    [setOpen, setDate]
  );
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


  console.log('date', formatDate(date));

  const renderDate = () => {
    return `${VietNameseDate[date.getDay()]}, ${date.getDate()} tháng ${date.getMonth()+1} năm ${date.getFullYear()}`;
  }

  return (
    <>
      <TouchableOpacity disabled={disabled} onPress={() => setOpen(true)}>
        <View style={styleA.conText}>
        <Text style={styleA.date}>
          {date ? renderDate() : placeHolder}
        </Text>
        </View>
      </TouchableOpacity>
      <DatePickerModal
        locale="vi"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        validRange={validRange}
      />
    </>
  );
}

const styleA = StyleSheet.create({
  date:{
    alignSelf: "center",
    top:5
  },
  conText:{
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    //   flexDirection: "row",
    //   alignSelf:"center",
      marginTop: 0,
      width: "100%",
    height:30,
    alignItems:'center',
    width:250,
    borderRadius:10,
    borderColor:"#7E7C7C"
  }
})

export default DatePicker;