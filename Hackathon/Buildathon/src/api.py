from models import Project, Review, BuildResult
from utils import generate_id, score_to_grade, paginate


_projects: dict[str, Project] = {}
_reviews: dict[str, list[Review]] = {}
_builds: dict[str, BuildResult] = {}


def create_project(name: str, description: str, owner: str, tags: list[str] = None) -> Project:
    project = Project(
        id=generate_id(),
        name=name,
        description=description,
        owner=owner,
        tags=tags or [],
    )
    _projects[project.id] = project
    return project


def get_project(project_id: str) -> Project | None:
    return _projects.get(project_id)


def list_projects(page: int = 1) -> list[Project]:
    return paginate(list(_projects.values()), page)


def submit_review(project_id: str, reviewer: str, score: int, comment: str = None) -> Review:
    review = Review(
        id=generate_id(),
        project_id=project_id,
        reviewer=reviewer,
        score=score,
        comment=comment,
    )
    _reviews.setdefault(project_id, []).append(review)
    return review


def get_reviews(project_id: str) -> list[Review]:
    return _reviews.get(project_id, [])


def average_score(project_id: str) -> float | None:
    reviews = get_reviews(project_id)
    if not reviews:
        return None
    return sum(r.score for r in reviews) / len(reviews)


def project_grade(project_id: str) -> str:
    score = average_score(project_id)
    if score is None:
        return "N/A"
    return score_to_grade(int(score))


def record_build(project_id: str, success: bool, logs: list[str], artifacts: list[str] = None) -> BuildResult:
    result = BuildResult(
        project_id=project_id,
        success=success,
        logs=logs,
        artifacts=artifacts or [],
    )
    _builds[project_id] = result
    return result


def latest_build(project_id: str) -> BuildResult | None:
    return _builds.get(project_id)
