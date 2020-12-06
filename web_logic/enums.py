import enum


class publicationStatus(enum.Enum):
    Submited = "s"
    Accepted = "a"
    Published = "p"


class studentTypes(enum.Enum):
    FirstDegree = "b"
    SecondDegreeProject = "mp"
    SecondDegreeThesis = "mt"
    ThirdDegree = "p"


class buttonTypes(enum.Enum):
    Download = "d"
    View = "v"
    Cite = "c"


class githubLoginType(enum.Enum):
    TOKEN = "t"
    CRADENTIOALS = "c"
