import uuid
import re
from typing import Any


def generate_id() -> str:
    return str(uuid.uuid4())[:8]


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[\s_-]+", "-", text)


def paginate(items: list[Any], page: int, size: int = 10) -> list[Any]:
    start = (page - 1) * size
    return items[start : start + size]


def score_to_grade(score: int) -> str:
    if score >= 9:
        return "A"
    if score >= 7:
        return "B"
    if score >= 5:
        return "C"
    return "F"


def flatten(nested: list[list[Any]]) -> list[Any]:
    return [item for sublist in nested for item in sublist]
