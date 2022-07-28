import UserCardData from "./UserCardData";
import UserCardStatus from "./UserCardStatus";

const UserCardContent = ({ user, loading }) => (
    <>
        <UserCardData label="اسم المستخدم:" data={user.Username} />
        <UserCardData label="رقم الجوال:" data={user.Mobile} />
        <UserCardData label="رقم الهوية:" data={user.NationalNumber} />
        <UserCardData label="البريد:" data={user.Email} />
        <UserCardData label="الرقم الوظيفي:" data={user.JobNumber} />
        <UserCardStatus active={user.IsActive} loading={loading} />
        <UserCardData label="نوع الموظف:" data={user.IsCompany ? "شركة" : "رسمي"} />
        <UserCardData label="الوظيفة:" data={user.SecurityUserJobNameFl} />
    </>
);

export default UserCardContent;
