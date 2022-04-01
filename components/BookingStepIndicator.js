import StepIndicator from 'react-native-step-indicator';

const labels = ["Chọn chi nhánh", "Xác nhận", "Thanh toán", "Trang điểm thử", "Hoàn tất"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: '#fe7013',
}

import React from 'react';
import { useStyle } from '../utils/style';
import { View } from './Themed';

function BookingStepIndicator({ currentStep }) {
  const styles = useStyle();

  return (
    <View
      style={styles.bookingTopIndicator}
    >
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        labels={labels}
        stepCount={5}
      />
    </View>
  );
}

export default BookingStepIndicator;