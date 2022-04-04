import {
  registerTranslation,
} from 'react-native-paper-dates';

import { TimePickerModal } from 'react-native-paper-dates';
import { useState, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './Themed';
import { VietNameseDate } from '../utils/DateHelper';
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

function TimePicker({ placeHolder = "Chọn giờ", validRange, onConfirm }) {
  const [hour, setHour] = useState(undefined);
  const [minute, setMinute] = useState(undefined);
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setHour(params.hours);
      setMinute(params.minutes);
      onConfirm && onConfirm(params.date);
      setOpen(false);
    },
    [setOpen, setHour, setMinute]
  );

  console.log('date', hour);

  const renderDate = () => {
    return `${hour}:${minute}`;
  }

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text>
          {hour ? renderDate() : placeHolder}
        </Text>
      </TouchableOpacity>
      <TimePickerModal
        locale="vi"
        mode="single"
        visible={open}
        hours={hour}
        minutes={minute}
        onDismiss={onDismissSingle}
        onConfirm={onConfirmSingle}
        validRange={validRange}
      />
    </>
  );
}

export default TimePicker;