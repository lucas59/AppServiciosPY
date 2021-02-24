import { ALTERN_PANEL } from "../Contains";

export const CHANGE_OPTIONPANEL_VISIBLE = (value) => {
    return {
        type: ALTERN_PANEL,
        payload: value
    }
}
