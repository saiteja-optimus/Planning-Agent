from dataclasses import dataclass, field
from typing import Optional


@dataclass
class Project:
    id: str
    name: str
    description: str
    owner: str
    tags: list[str] = field(default_factory=list)

    def is_tagged(self, tag: str) -> bool:
        return tag in self.tags


@dataclass
class Review:
    id: str
    project_id: str
    reviewer: str
    score: int
    comment: Optional[str] = None

    def is_passing(self, threshold: int = 7) -> bool:
        return self.score >= threshold


@dataclass
class BuildResult:
    project_id: str
    success: bool
    logs: list[str] = field(default_factory=list)
    artifacts: list[str] = field(default_factory=list)

    def summary(self) -> str:
        status = "PASSED" if self.success else "FAILED"
        return f"Build {status} for project {self.project_id} — {len(self.artifacts)} artifact(s)"
