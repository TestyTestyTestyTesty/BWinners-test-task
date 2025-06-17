import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFilterStore } from '@store/useFilterStore';
import { messages } from '@messages/messages';

export const DateFilter = () => {
  const { selectedDate, setSelectedDate } = useFilterStore();

  return (
    <div className="flex justify-center items-center ">
      <label className="font-semibold mr-2 text-gray-800">{messages.common.filter_by_date}</label>
      <DatePicker
        selected={selectedDate}
        onChange={setSelectedDate}
        placeholderText={messages.common.select_date}
        isClearable
        dateFormat="yyyy-MM-dd"
        className="w-full text-black lg:max-w-xs border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        calendarClassName="!bg-white !border !rounded-lg !shadow-lg !p-2"
        dayClassName={(date) =>
          'text-sm p-1 rounded-full hover:bg-blue-100 transition ' +
          (selectedDate && date.toDateString() === selectedDate.toDateString()
            ? 'bg-blue-500 text-black'
            : '')
        }
      />
    </div>
  );
};
