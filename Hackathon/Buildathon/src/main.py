from api import create_project, submit_review, record_build, project_grade, latest_build


def demo():
    proj = create_project(
        name="AI Code Reviewer",
        description="Automated code review using graph analysis",
        owner="saiteja-optimus",
        tags=["ai", "hackathon", "python"],
    )
    print(f"Created project: {proj.name} ({proj.id})")

    submit_review(proj.id, reviewer="alice", score=9, comment="Great architecture!")
    submit_review(proj.id, reviewer="bob", score=8, comment="Solid implementation")
    submit_review(proj.id, reviewer="carol", score=7)

    grade = project_grade(proj.id)
    print(f"Project grade: {grade}")

    build = record_build(
        project_id=proj.id,
        success=True,
        logs=["Installing deps...", "Running tests...", "Build complete"],
        artifacts=["dist/app.whl"],
    )
    print(build.summary())

    latest = latest_build(proj.id)
    if latest:
        print(f"Latest build success: {latest.success}")


if __name__ == "__main__":
    demo()
