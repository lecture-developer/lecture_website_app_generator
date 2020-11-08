class SearchEntry:
    """
    A search document used in the search engine of the website
    """

    def __init__(self,
                 id: int,
                 title: str,
                 body: str,
                 short_body: str,
                 url: str):
        self.id = id
        self.title = title
        self.body = body
        self.short_body = short_body
        self.url = url

    @staticmethod
    def print_search_list(search_entry_list: list) -> str:
        return "{}\n\n".join([str(item) for item in search_entry_list])

    def __repr__(self) -> str:
        return "Search Entry (id = {})".format(self.id)

    def __str__(self) -> str:
        return 'var doc' + str(self.id) + ' = {\n    "id": "' + str(self.id)\
               + '",\n    "body": "' + self.body + '",'\
               + '\n    "shortBody": "' + self.short_body + '",'\
               + '\n    "title": "' + self.title + '",'\
               + '\n    "url": "' + self.url + '"\n};'
