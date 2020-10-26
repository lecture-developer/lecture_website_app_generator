from web_logic.pages.ipage import IPage


class SEOPage:

    def __init__(self,
                 title,
                 description,
                 keywords = None):
        self.title = title
        self.description = description
        self.keywords = keywords if not None else []

    def analyze_seo(self):
        pass


