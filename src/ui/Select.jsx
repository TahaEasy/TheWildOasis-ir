import styled, { css } from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Option = styled.option`
  ${(props) =>
    props.active
      ? css`
          background-color: var(--color-brand-300);
        `
      : null}
  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const Select = ({ options, type, value, onChange, ...props }) => {
  return (
    <StyledSelect type={type} onChange={onChange} value={value} {...props}>
      {options.map((option, index) => (
        <Option key={index} value={option.value}>
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default Select;
