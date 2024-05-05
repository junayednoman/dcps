
const DataGrid = ({ children, title, mtZero }) => {

    return (
        <div style={{ paddingTop: mtZero ? "10px" : "24px" }}>
            {title &&
                <h2 className='text-base font-semibold mb-2 text-[#008B4C]'>{title}ঃ</h2>
            }
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-x-4 gap-y-4'>
                {children}
            </div>
        </div>
    );
};

export default DataGrid;