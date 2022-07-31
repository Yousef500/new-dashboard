import CardData from "./CardData";
import UserCardStatus from "./UserCardStatus";

const UserCardContent = ({ user, loading }) => (
    <>
        <CardData label="اسم المستخدم:" data={user.Username} />
        <CardData label="رقم الجوال:" data={user.Mobile} />
        <CardData label="رقم الهوية:" data={user.NationalNumber} />
        <CardData label="البريد:" data={user.Email} />
        <CardData label="الرقم الوظيفي:" data={user.JobNumber} />
        <UserCardStatus active={user.IsActive} loading={loading} />
        <CardData label="نوع الموظف:" data={user.IsCompany ? "شركة" : "رسمي"} />
        <CardData label="الوظيفة:" data={user.SecurityUserJobNameFl} />
    </>
);

export default UserCardContent;
