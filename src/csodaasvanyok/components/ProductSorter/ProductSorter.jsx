import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./product-sorter.scss";

export default function ProductSorter({ sortTitle, handleSortChange }) {
  return (
    <FormControl
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-input": {
          color: "var(--primary-font-color)",
          marginLeft: "6px",
        },
        "& .MuiInputLabel-root": {
          color: "var(--primary-font-color)",
          fontFamily: "var(--primary-font-family)",
          fontWeight: "600",
          fontSize: "1.8rem",
          marginLeft: "6px",
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
          boxShadow: "0 2px 2px 1px var(--primary-font-color-shadow)",
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
        "@media (min-width: 1024px)": {
          width: "200px", // Set the width to 200px for larger screens
        },
      }}
    >
      <InputLabel id="demo-simple-select-label" sx={{ fontSize: "1.8rem" }}>
        Rendezés
      </InputLabel>
      <Select
        MenuProps={{ disableScrollLock: true }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sortTitle}
        onChange={handleSortChange}
        label="Rendezés"
        sx={{ fontSize: "1.8rem" }}
      >
        <MenuItem sx={{ fontSize: "1.8rem" }} value={1}>
          Ár (növekvő)
        </MenuItem>
        <MenuItem sx={{ fontSize: "1.8rem" }} value={2}>
          Ár (csökkenő)
        </MenuItem>
        <MenuItem sx={{ fontSize: "1.8rem" }} value={3}>
          Legújabb
        </MenuItem>
      </Select>
    </FormControl>
  );
}
