export const set_tag_show = (tag) => {
    return {
        type: 'SET_TAG_SHOW',
        payload: tag
    }
}

export const set_tags = (tags) => {
    return {
        type: 'SET_TAGS',
        payload: tags
    }
}