import {
  registerTranslation,
} from 'react-native-paper-dates';

import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { useState, useCallback } from 'react';

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

  return (
    <>
      <Button onPress={() => setOpen(true)} mode="outlined">
        Chọn ngày
      </Button>
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