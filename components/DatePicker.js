import {
  registerTranslation,
} from 'react-native-paper-dates';

import { DatePickerModal } from 'react-native-paper-dates';
import { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from './Themed';
import { VietNameseDate } from '../utils/DateHelper';
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


function DatePicker(props) {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  console.log(date);

  const renderDate = () => {
    return `${VietNameseDate[date.getDay()]}, ${date.getDate()} tháng ${date.getMonth()} năm ${date.getFullYear()}`;
  }

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text>
          {date ? renderDate() : 'Chọn ngày'}
        </Text>
      </TouchableOpacity>
      <DatePickerModal
        locale="vi"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      // validRange={{
      //   startDate: new Date(2021, 1, 2),  // optional
      //   endDate: new Date(), // optional
      //   disabledDates: [new Date()] // optional
      // }}
      // onChange={} // same props as onConfirm but triggered without confirmed by user
      // saveLabel="Save" // optional
      // uppercase={false} // optional, default is true
      // label="Select date" // optional
      // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      />
    </>
  );
}

export default DatePicker;