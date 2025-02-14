import { useEffect, useState } from "react";

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
    <input
      onChange={handleInputChange}
      value={value}
      onFocus={handleInputClick}
    />
  );
};

export default Input;
// 0a9d470a-3fe3-4c2e-b336-1b49bef2aaf8
// 0a9d470a-3fe3-4c2e-b336-1b49bef2aaf8
// ACQ0a9d470a3fe34c2eb3361b49bef2aaf8
