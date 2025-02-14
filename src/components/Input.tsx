import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  border: 1px solid #000;
  border-radius: 4px;
  font-size: 16px;
  padding: 16px;
  width: 320px;
  font-weight: 700;
  color: darkorange;
`;

const Input = () => {
  const [value, setValue] = useState("");

  const splitOn = (acquisitionName: string, ...indices: number[]) =>
    [0, ...indices].map((index, i, m) =>
      acquisitionName.slice(index, m[i + 1])
    );

  useEffect(() => {
    const uuid = [value.replace(/^ACQ/gim, "")].map((acquisitionName) =>
      splitOn(acquisitionName, 8, 12, 16, 20).join("-")
    )[0];

    const isUuid = uuid.match(
      /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gim
    );

    if (!isUuid) return;

    navigator.clipboard.writeText(uuid);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleInputClick = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return (
    <div>
      <StyledInput
        onChange={handleInputChange}
        value={value}
        onFocus={handleInputClick}
      />
    </div>
  );
};

export default Input;
