from io import BytesIO
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet

styles = getSampleStyleSheet()


def export_pdf(messages):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    story = []

    for message in messages:

        role = message.role.capitalize()

        story.append(
            Paragraph(
                f"<b>{role}</b>",
                styles["Heading2"]
            )
        )

        story.append(
            Paragraph(
                message.content.replace("\n", "<br/>"),
                styles["BodyText"]
            )
        )

    doc.build(story)

    buffer.seek(0)

    return buffer