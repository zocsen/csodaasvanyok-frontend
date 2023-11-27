import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function DeliveryMethodSelector({
  deliveryMethod,
  handleDeliverySelection,
}) {
  return (
    <FormControl
      sx={{
        width: "100%",
        minHeight: "50px",
        padding: "0 15px 10px",
        "& .MuiOutlinedInput-input": {
          color: "var(--primary-font-color)",
          marginLeft: "6px",
        },
        "& .MuiInputLabel-root": {
          color: "var(--primary-font-color)",
          fontFamily: "var(--primary-font-family)",
          fontWeight: "600",
          fontSize: "1.6rem",
          marginLeft: "18px",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--primary-font-color) ",
          borderWidth: "1px",
          borderRadius: "var(--border-radius-md)",
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "var(--primary-font-color)",
        },
        "&:hover .MuiInputLabel-root": {
          color: "var(--primary-font-color)",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--primary-font-color)",
          boxShadow: "0 2px 2px 1px var(--shadow-color)",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "var(--primary-font-color)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--primary-font-color)",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          { borderColor: "var(--primary-font-color)" },
        "& .MuiSelect-icon": {
          color: "var(--primary-font-color)",
          fontSize: "2.6rem",
        },
        "@media (min-width: 600px)": {
          padding: "0 30px",
          "& .MuiInputLabel-root": {
            marginLeft: "30px",
          },
        },
      }}
    >
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          fontSize: "1.8rem",
        }}
      >
        Szállítás
      </InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={deliveryMethod}
        onChange={handleDeliverySelection}
        label="Rendezés"
        sx={{ fontSize: "1.4rem" }}
      >
        <MenuItem sx={{ fontSize: "1.5rem" }} value={"FoxPost Automata"}>
          FoxPost csomagautómata 990Ft
        </MenuItem>
        <MenuItem sx={{ fontSize: "1.5rem" }} value={"FoxPost Házhozszállítás"}>
          FoxPost házhozszállítás 1590Ft
        </MenuItem>
        <MenuItem sx={{ fontSize: "1.5rem" }} value={"Posta Házhozszállítás"}>
          Magyar Posta házhozszállítás 1190Ft
        </MenuItem>
      </Select>
    </FormControl>
  );
}
