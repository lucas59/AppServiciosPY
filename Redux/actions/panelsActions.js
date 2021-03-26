import { ALTERN_PANEL } from "../Contains";

export const set_open_panel = (value) => {
    return {
        type: ALTERN_PANEL,
        payload: value
    }
}
