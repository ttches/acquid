import { useEffect, useState } from "react";
import styled from "styled-components";

const Value = styled.div`
  border: 1px solid darkorange;
  border-radius: 4px;
  font-size: 16px;
  padding: 24px;
  font-weight: 700;
  color: darkorange;
  margin-bottom: 32px;

  &.hidden {
    visibility: hidden;
  }
`;

const isUuid = (str: string) =>
  str.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gim);

const Button = () => {
  const [value, setValue] = useState("");

  const splitOn = (acquisitionName: string, ...indices: number[]) =>
    [0, ...indices].map((index, i, m) =>
      acquisitionName.slice(index, m[i + 1])
    );

  useEffect(() => {
    if (!value) return;

    navigator.clipboard.writeText(value);
  }, [value]);

  const handleButtonClick = async () => {
    const clipboardValue = await navigator.clipboard.readText();
    console.log("clipboardValue", clipboardValue);
    if (!clipboardValue) return;

    let valueIsUuid = isUuid(clipboardValue);
    if (valueIsUuid) {
      const newValue = `ACQ${clipboardValue.replace(/-/gim, "")}`;
      console.log("setting acquisitionName", newValue);
      setValue(newValue);
      return;
    }

    const uuid = [clipboardValue.replace(/^ACQ/gim, "")].map(
      (acquisitionName) => splitOn(acquisitionName, 8, 12, 16, 20).join("-")
    )[0];
    console.log("uuid", uuid);
    valueIsUuid = isUuid(uuid);
    if (valueIsUuid) {
      console.log("setting uuid", uuid);
      setValue(uuid);
      return;
    }
  };

  return (
    <div>
      <Value className={value ? "" : "hidden"}>{value}</Value>
      <button onClick={handleButtonClick} value={value}>
        Convert
      </button>
    </div>
  );
};

export default Button;
