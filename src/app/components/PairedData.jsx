

const PairedData = ({ label, value }) => {
    return (
        <div className="p-2 px-3 border border-[#008b4c1a] bg-[#008b4c06] rounded-[4px]">
            <p className="text-black"><span className="font-medium">{label}ঃ </span>{value}</p>
        </div>
    );
};

export default PairedData;