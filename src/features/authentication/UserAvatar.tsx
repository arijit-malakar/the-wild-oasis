import styled from "styled-components";
import { useUser } from "./useUser";
import { UserType } from "./userTypes";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user } = useUser();
  const { fullName, photo } = user as UserType;

  return (
    <StyledUserAvatar>
      <Avatar
        src={photo ? `uploads/users/${photo}` : "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
