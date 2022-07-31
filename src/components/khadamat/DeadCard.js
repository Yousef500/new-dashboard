import { Card, CardContent, CardHeader, Link, Tooltip, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CardData from "./CardData";
import DeadDropdown from "./DeadDropdown";

const DeadCard = ({ person }) => {
    const {
        NameFl,
        NationalityName,
        CemeteryLocationLat: lat,
        CemeteryLocationLong: lng,
        AgeYears,
        AgeMonths,
        AgeDays,
        CemeteryName,
        CemeteryAddress,
        DateOfDeath,
        DeathTime,
        NationalNumber,
    } = person;

    return (
        <Card
            elevation={10}
            sx={{
                height: 550,
                overflowY: "max-content",
                background: `
                    linear-gradient(
                        45deg,
                        hsl(180deg 6% 93%) 0%,
                        hsl(181deg 11% 93%) 11%,
                        hsl(182deg 18% 93%) 22%,
                        hsl(183deg 25% 94%) 33%,
                        hsl(184deg 33% 94%) 44%,
                        hsl(185deg 42% 94%) 56%,
                        hsl(186deg 52% 94%) 67%,
                        hsl(187deg 63% 95%) 78%,
                        hsl(187deg 76% 95%) 89%,
                        hsl(188deg 92% 95%) 100%
                      )`,
            }}
        >
            <CardHeader
                titleTypographyProps={{
                    variant: "h4",
                    align: "center",
                    // gutterBottom: true,
                }}
                title={
                    <Link component={RouterLink} to={`/dead/${person.Id}`} underline="hover">
                        {NameFl}
                    </Link>
                }
                action={<DeadDropdown lat={lat} long={lng} id={person.Id} />}
            />
            <CardContent sx={{ mt: 2 }}>
                <CardData
                    label="العمر:"
                    data={
                        <Tooltip title={`${AgeYears} سنة / ${AgeMonths} أشهر / ${AgeDays} أيام`}>
                            <Typography>{AgeYears} سنة</Typography>
                        </Tooltip>
                    }
                />
                <CardData label="الجنسية:" data={NationalityName} />
                <CardData label="المقبرة:" data={CemeteryName} />
                <CardData label="عنوان المقبرة:" data={CemeteryAddress} />
                <CardData label="تاريخ الوفاة:" data={DateOfDeath.split("T")[0]} />
                <CardData label="وقت الوفاة:" data={DeathTime} />
                <CardData label="رقم الهوية:" data={NationalNumber} noDivider />
            </CardContent>
        </Card>
    );
};

export default DeadCard;
