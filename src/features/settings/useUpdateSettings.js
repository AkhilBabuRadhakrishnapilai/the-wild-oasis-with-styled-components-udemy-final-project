import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: (newSettings) => updateSetting(newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      }),
        toast.success("Settings Updated Successfully...!");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateSettings };
}
