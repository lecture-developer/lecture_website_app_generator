import re


# Converting the first character in the string to uppercase, leaving the rest as is
def capitalize(string: str) -> str:
    return string[0].upper() + string[1:]


# Splitting a camelCase two-words-string to a capitalize, space-separated string
def toSentenceCase(string: str) -> str:
    # TODO: fix it if needed
    pass


# Splitting a camelCase two-words-string to a capitalize, space-separated string
def arrayToObject(arr: list) -> dict:
    return {key: "" for key in arr}
