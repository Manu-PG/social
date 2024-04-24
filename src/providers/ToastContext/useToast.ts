import { useContext } from "react";
import { ToastContext } from ".";
import { ToastData } from "../../types/toast.types";

const useToast = () => {
  const { toastList, setToastList } = useContext(ToastContext);

  const deleteToast = (toastId: number) => {
    setToastList((currentToastList) =>
      currentToastList.filter((toast) => toast.id !== toastId)
    );
  };

  const createToast = (newToast: Omit<ToastData, "id">) => {
    const id = Date.now() + Math.random();

    setToastList((currentToastList) => [
      ...currentToastList,
      { id, ...newToast },
    ]);
  };

  return { toastList, createToast, deleteToast };
};

export default useToast;
