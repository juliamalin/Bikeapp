import argparse
import os
import sys
import csv
from csvvalidator import CSVValidator, number_range_inclusive,\
    write_problems, datetime_string

def create_validator():

    field_names = (
                   'departure',
                   'return',
                   'departure_stationID',
                   'departure_stationNAME',
                   'return_stationID',
                   'return_stationNAME',
                   'distance',
                   'duration'
                   )

    validator = CSVValidator(field_names)
    validator.add_header_check('EX1', 'bad header')

    validator.add_record_length_check('EX2', 'unexpected record length')
    
    validator.add_value_check('departure', datetime_string('%Y-%m-%dT%H:%M:%S'),
                              'EX3', 'departure must be an datetime')
    validator.add_value_check('return', datetime_string('%Y-%m-%dT%H:%M:%S'),
                          'EX4', 'return must be a valid datetime')
    validator.add_value_check('departure_stationID', int,
                          'EX5', 'departure_stationID must be an integer')
    validator.add_value_check('departure_stationNAME', str,
                          'EX6', 'departure_stationNAME must be a string')
    validator.add_value_check('return_stationID', int,
                          'EX7', 'return_stationID must be an integer')
    validator.add_value_check('return_stationNAME', str,
                          'EX8', 'return_stationNAME must be a string')
    validator.add_value_check('distance', number_range_inclusive(10, float('inf')),
                          'EX9', 'distance must be greater than 10')
    validator.add_value_check('duration', number_range_inclusive(10, float('inf')),
                          'EX10', 'duration must be greater than 10')
    
    return validator

def main():

    description = 'Validate a CSV data file.'
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument('file', 
                        metavar='FILE', 
                        help='a file to be validated')
    parser.add_argument('-l', '--limit',
                        dest='limit',
                        type=int,
                        action='store',
                        default=0,
                        help='limit the number of problems reported'
                        )
    parser.add_argument('-s', '--summarize',
                        dest='summarize',
                        action='store_true',
                        default=False,
                        help='output only a summary of the different types of problem found'
                        )
    parser.add_argument('-e', '--report-unexpected-exceptions',
                        dest='report_unexpected_exceptions',
                        action='store_true',
                        default=False,
                        help='report any unexpected exceptions as problems'
                        )
        
    args = parser.parse_args()

    if not os.path.isfile(args.file):
        print (f'{args.file} is not a file')
        sys.exit(1)
    
    with open(args.file, 'r') as f:
        data = csv.reader(f, delimiter=',')
        rows = list(data)

        validator = create_validator()

    
        problems = validator.validate(rows, 
                                        summarize=args.summarize,
                                        report_unexpected_exceptions=args.report_unexpected_exceptions,
                                        context={'file': args.file})
        
        write_problems(problems, sys.stdout, 
                        summarize=args.summarize, 
                        limit=args.limit)
        
        invalid_row_indices = set()

        #korjataan indeksointi alkamaan nollasta
        for problem in problems:
            row_index = problem.get('row')
            row_indexCORRECT = row_index-1
            if row_index is not None:
                invalid_row_indices.add(row_indexCORRECT)
        

        valid_rows = []


        for i, row in enumerate(rows):
            if i not in invalid_row_indices or i==0:
                valid_rows.append(row)

    output_file = 'valid_rows2021-07.csv'
    with open(output_file, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerows(valid_rows)
        
    if problems: 
            sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    main()


