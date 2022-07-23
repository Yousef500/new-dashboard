import UserCardData from "./UserCardData";

const UserCardContent = ({ user }) => (
    <>
        <UserCardData label="اسم المستخدم:" data={user.Username} />
        <UserCardData label="رقم الجوال:" data={user.Mobile} />
        <UserCardData label="رقم الهوية:" data={user.NationalNumber} />
        <UserCardData label="البريد:" data={user.Email} />
        <UserCardData label="الرقم الوظيفي:" data={user.JobNumber} />
        <UserCardData
            label="الحالة:"
            data={user.IsActive ? "فعال" : "غير فعال"}
            dataProps={{ color: `${user.IsActive ? "green" : "error"}` }}
        />
        <UserCardData label="نوع الموظف:" data={user.IsCompany ? "شركة" : "رسمي"} />
        <UserCardData label="الوظيفة:" data={user.SecurityUserJobNameFl} />
    </>
);

export default UserCardContent;
