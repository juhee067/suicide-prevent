import React from "react";
import styled from "styled-components";

const Inner = styled.div`
  position: relative;
  width: 49%;
`;

const Input = styled.input`
  padding: 0 10px;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => theme.color.mainWhite};
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  color: ${({ theme }) => theme.color.mainBlack};
  font-size: 16px;
  transition: all 0.3s;
  outline: none;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
  }
`;

const Label = styled.label<{ focused: boolean }>`
  position: absolute;
  left: 10px;
  top: ${({ focused }) => (focused ? "-30%" : "50%")};
  transform: translateY(-50%);
  transition: all 0.3s;
  font-size: 11px;
  color: ${({ theme }) => theme.color.mainGray};
`;

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
}) => (
  <Inner>
    <Label htmlFor={type} focused={focused}>
      {label}
    </Label>
    <Input type={type} id={type} value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} />
  </Inner>
);

export default InputField;
