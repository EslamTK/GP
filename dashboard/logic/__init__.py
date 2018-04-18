from .administrator_logic import AdministratorLogic
from .educator_logic import EducatorLogic
from .general_logic import GeneralLogic
from .student_logic import StudentLogic

general = GeneralLogic()
student = StudentLogic()
educator = EducatorLogic()
administrator = AdministratorLogic(student=student)

__all__ = ['general', 'student', 'educator', 'administrator']
