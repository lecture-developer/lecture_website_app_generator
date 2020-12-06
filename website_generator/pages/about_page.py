from website_generator.pages.ipage import IPage


class AboutPage(IPage):

    def __init__(self, seo_page):
        IPage.__init__(self, seo_page=seo_page)


