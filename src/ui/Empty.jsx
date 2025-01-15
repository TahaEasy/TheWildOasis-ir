import { HiArchiveBoxXMark } from "react-icons/hi2";
import styled from "styled-components";

const HiArchiveBoxXMarkIcon = styled(HiArchiveBoxXMark)`
  width: 3rem;
  height: 3rem;
`;

const P = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

function Empty({ resourceName }) {
  return (
    <P>
      حتی یک {resourceName} هم پیدا نشد! {<HiArchiveBoxXMarkIcon />}
    </P>
  );
}

export default Empty;
