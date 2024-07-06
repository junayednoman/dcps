import SearchableSelect from "./SearchableSelect";

const UserNames = ({
  userNameError,
  role = "ueo",
  selectedUserName,
  handleUserNameChange,
  schoolOptions,
}) => {
  const clusterOptions = [
    { value: "সাধুহাটি ক্লাস্টার", label: "সাধুহাটি ক্লাস্টার" },
    { value: "কামালপুর ক্লাস্টার", label: "কামালপুর ক্লাস্টার" },
    { value: "ভাদগাঁও ক্লাস্টার", label: "ভাদগাঁও ক্লাস্টার" },
    { value: "শ‌্যামরারবাজার ক্লাস্টার", label: "শ‌্যামরারবাজার ক্লাস্টার" },
    { value: "আমতৈল ক্লাস্টার", label: "আমতৈল ক্লাস্টার" },
    { value: "নাজিরাবাদ ক্লাস্টার", label: "নাজিরাবাদ ক্লাস্টার" },
    { value: "বাহারমর্দান ক্লাস্টার", label: "বাহারমর্দান ক্লাস্টার" },
    { value: "আকবরপুর ক্লাস্টার", label: "আকবরপুর ক্লাস্টার" },
  ];

  return (
    <div>
      <SearchableSelect
        options={
          role === "ueo"
            ? clusterOptions
            : schoolOptions === null
            ? [{ value: "failed to fetch data", label: "failed to fetch data. try again later." }]
            : schoolOptions
        }
        onChange={handleUserNameChange}
        value={selectedUserName}
        label={`${role === "ueo" ?"ক্লাস্টার":"বিদ্যালয়"} সিলেক্ট করুন*`}
        placeholder={`${role === "ueo" ?"ক্লাস্টার":"বিদ্যালয়"} সিলেক্ট করুন*`}
      />
      {userNameError && (
        <p className="text-[#ED1C24] text-sm mb-4 -mt-3">
          ইউজার নামটি অবশ্যই সিলেক্ট করতে হবে।
        </p>
      )}
    </div>
  );
};

export default UserNames;
