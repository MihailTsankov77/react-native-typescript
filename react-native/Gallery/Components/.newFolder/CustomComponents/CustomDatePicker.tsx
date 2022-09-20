import React, { useState } from "react";
import { Button, Platform, TextInput } from "react-native";
import { Colorable, InputField, onChangeInterface, Resizeable} from "./shared/shared-interfaces";
import InputContainer, { inputStyle } from "./CustomElements/CustomInputContainer";
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import Btn from "./CustomButton";
import { notImplemeneted } from "./shared/shared-functions";



interface DatePickerProps extends Colorable, Resizeable, InputField, onChangeInterface {
   
}

const DatePicker = ({ value, onChange = notImplemeneted, bgColor = "rgba(236,236,236, 0.9)", color ="grey", borderColor = "rgba(230,230,230, 1)", 
                 prestine = true, ...rest}: DatePickerProps) => {
    
                    
                   
                    const [open, setOpen] = useState(false)
            const handleDateChange = ({ date }: { date: CalendarDate }) => {
                if(!date) return;

                onChange(date.toDateString());
                setOpen(false);
            }
                    
    return (
        
        <InputContainer color={color} {...rest}

            child={
                <>
               <Btn color='gray' event={() => setOpen(true)}  value={value || "Choose Date"}/>
                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    onDismiss={() => setOpen(false)}
                    date={new Date(value || new Date().toDateString())}
                    onConfirm={handleDateChange}
                    onChange={handleDateChange}
                    saveLabel="Save"
                />
              </>
                    }
            prestine={prestine} value={""} />
    );
}

export default DatePicker;