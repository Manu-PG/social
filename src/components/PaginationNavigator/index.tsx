import { Pagination } from "../../api/postTypes";
import ArrorSVG from "../../ui/svg/ArrorSVG";
import {
  PaginationNavigatorContainer,
  StyledButton,
  StyledInput,
} from "./PaginationNavigator.styled";

type PagesNavigatorProps = {
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  className?: string;
};

const PaginationNavigator = ({ pagination, setPagination, className }: PagesNavigatorProps) => {
  const setPage = (newPage: number) => {
    setPagination((currentValue) => {
      if (!currentValue._limit) return {};

      return {
        ...currentValue,
        _page: newPage > 0 ? newPage : 1,
      };
    });
  };

  const setLimit = (newLimit?: number) => {
    setPagination((currentValue) => {
      if (!newLimit) return {};

      return {
        ...currentValue,
        _page: currentValue._page ? currentValue._page : 1,
        _limit: newLimit,
      };
    });
  };

  const setNextLimit = () => {
    switch (pagination._limit) {
      case undefined:
      case 0:
        setLimit(10);
        break;
      case 10:
        setLimit(20);
        break;
      case 20:
        setLimit(50);
        break;
      default:
        setLimit(10);
        break;
    }
  };

  return (
    <PaginationNavigatorContainer className={className}>
      <StyledButton
        onClick={() => {
          setPage(pagination._page ? pagination._page - 1 : 1);
        }}
        disabled={!pagination._limit || !pagination._page || pagination._page <= 1}
      >
        <ArrorSVG direction="left" />
      </StyledButton>
      <StyledInput
        value={pagination._limit ? String(pagination._page || "") : ""}
        onChange={({ target }) => setPage(Number(target.value))}
      />
      <StyledButton
        onClick={() => {
          setPage(pagination._page ? pagination._page + 1 : 1);
        }}
        disabled={!pagination._limit}
      >
        <ArrorSVG direction="right" />
      </StyledButton>
      <StyledButton onClick={setNextLimit}>
        <span>{pagination._limit ? pagination._limit : "All"}</span>
      </StyledButton>
    </PaginationNavigatorContainer>
  );
};

export default PaginationNavigator;
