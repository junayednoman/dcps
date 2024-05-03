import AnimateHeight from "react-animate-height";

const DataDropdown = ({ title, itemKey, activeItem, setActiveItem, children }) => {

    const toggleItem = () => {
        setActiveItem((oldValue) => (oldValue === itemKey ? null : itemKey));
    };

    return (
        <div className='mt-3'>
            <button type="button" className={`relative border-gray-300 flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg border ${activeItem === itemKey ? ' bg-[#cce8db73]' : '  bg-[#e6f3ed86]'}  ${activeItem === itemKey ? 'active' : ''}`} onClick={toggleItem}>
                <h5 className="text-gray-900 text-[17px]">{title}</h5>
                <svg className={`w-4 h-4 ml-2 duration-500 ${activeItem === itemKey ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <AnimateHeight duration={300} height={activeItem === itemKey ? 'auto' : 0}>
                <ul className="p-3 pt-2">
                    {children}
                </ul>
            </AnimateHeight>
        </div>
    );
};

export default DataDropdown;
