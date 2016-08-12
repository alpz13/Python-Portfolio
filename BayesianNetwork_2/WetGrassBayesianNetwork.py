# -*- encoding: utf8 -*-
from BayesianNode import *

__author__ = 'Alex'

# Modelado de la Red
# Creamos los nodos correspondientes
#rain_bayesian_node = BayesianNode("rain")
#sprinkler_bayesian_node = BayesianNode("sprinkler")
#wet_grass_bayesian_node = BayesianNode("wet grass")
#sex_bayesian_node = BayesianNode("sex")
#fraud_bayesian_node = BayesianNode("fraud")
#jewelry_bayesian_node = BayesianNode("jewelry")

visit_asia_node = BayesianNode("Visit Asia")
smoking_node = BayesianNode("Smoking")
tuberculosis_node = BayesianNode("Tuberculosis")
lung_cancer_node = BayesianNode("Lung Cancer")
bronquitis_node = BayesianNode("Bronquitis")
FP_node = BayesianNode("FalsePositive")
DY_node = BayesianNode("Dypsea")
XR_node = BayesianNode("Xray")

# Establecemos el nodo independiente como raíz de nuestra red
#wet_grass_bayesian_network = rain_bayesian_node
#jewelry_bayesian_network = jewelry_bayesian_node

tuberculosis_bayesian_network = visit_asia_node

# Diseñamos la Red agregando los hijos de cada nodo
#rain_bayesian_node.add(sprinkler_bayesian_node)
#rain_bayesian_node.add(wet_grass_bayesian_node)
#sprinkler_bayesian_node.add(wet_grass_bayesian_node)
#sex_bayesian_node.add(fraud_bayesian_node)
#sex_bayesian_node.add(jewelry_bayesian_node)
#fraud_bayesian_node.add(jewelry_bayesian_node)

visit_asia_node.add(smoking_node)
visit_asia_node.add(tuberculosis_node)
smoking_node.add(tuberculosis_node)
#smoking_node.add(lung_cancer_node)
#smoking_node.add(bronquitis_node)
#tuberculosis_node.add(FP_node)
#lung_cancer_node.add(FP_node)
#bronquitis_node.add(DY_node)
#FP_node.add(DY_node)
#FP_node.add(XR_node)

# Establecemos las tablas para cada nodo y sus valores probabilísticos
# Orden: Rain
#rain_bayesian_node.set_table({True: 0.2, False: 0.8})

# Orden: Rain, Sprinkler
#sprinkler_bayesian_node.set_table({
#    True: {
#        True: 0.01,
#        False: 0.99},
#    False: {
#        True: 0.4,
#        False: 0.6}})


# Orden: Sprinkler, Rain, Grass Wet
#wet_grass_bayesian_node.set_table({
#    True: {
#        True: {
#            True: 0.99,
#            False: 0.01
#        },
#        False: {
#            True: 0.9,
#            False: 0.1
#        }
#    },
#    False: {
#        True: {
#            True: 0.8,
#            False: 0.2
#        },
#        False: {
#            True: 0.0,
#            False: 1.0
#        }
#    }
#})

#Orden Sex
#sex_bayesian_node.set_table({True: 0.6, False: 0.4})

#Orden Sex, Fraud
#fraud_bayesian_node.set_table({
#	True: {
#		True: 0.7,
#		False: 0.3},
#	False: {
#		True: 0.8,
#		False: 0.2}})

#Orden Fraud, Sex, Jewelry
#Orden2 Sex, Fraud, Jewelry
#jewelry_bayesian_node.set_table({
#	True: {
#		True: {
#			True: 0.7,
#			False: 0.3
#		},
#		False: {
#			True: 0.8,
#			False: 0.2
#		}
#	},
#	False: {
#		True: {
#			True: 0.1,
#			False: 0.9
#		},
#		False: {
#			True: 0.9,
#			False: 0.1
#		}
#	}
#})
visit_asia_node.set_table({True: 0.6, False: 0.4})

#visit,smoking
smoking_node.set_table({
	True: {
		True: 0.3,
		False: 0.7},
	False: {
		True: 0.2,
		False: 0.8}})
#visit, tuber
#tuberculosis_node.set_table({
#	True: {
#		True: 0.48,
#		False: 0.52},
#	False : {
#		True: 0.12,
#		False: 0.88}})
#smokin, lc
#lung_cancer_node.set_table({
#	True: {
#		True: 0.7,
#		False: 0.3},
#	False: {
#		True: 0.1,
#		False: 0.9}})
#smoking bronq
#bronquitis_node.set_table({
#	True: {
#		True: 0.95,
#		False: 0.05},
#	False: {
#		True: 0.7,
#		False: 0.3}})

# Lc, Tu,FP
tuberculosis_node.set_table({
	True: {
		True: {
			True: 1.0,
			False: 0.0
		},
		False: {
			True: 1.0,
			False: 0.0
		}
	},
	False: {
		True: {
			True: 1.0,
			False: 0.0
		},
		False: {
			True: 0.0,
			False: 1.0
		}
	}
})
# #FP, TU, DY
#DY_node.set_table({
#	True: {
#		True: {
#			True: 0.9,
#			False: 0.1
#		},
#		False: {
#			True: 0.7,
#			False: 0.3
#		}
#	},
#	False: {
#		True: {
#			True: 0.8,
#			False: 0.2
#		},
#		False: {
#			True: 0.1,
#			False: 0.9
#		}
#	}
#})

#FP XR
#XR_node.set_table({
#	True: {
#		True: 0.95,
#		False: 0.05},
#	False: {
#		True: 0.05,
#		False: 0.95}})

# Idiom personal que me permite encontrar la probabilidad específica de una tabla dados ciertos valores
#print wet_grass_bayesian_network.p[True][False][False]

#print wet_grass_bayesian_node
#wet_grass_bayesian_node.p_sum({'var': wet_grass_bayesian_node.var, 'value': True})

# a dado b
#print wet_grass_bayesian_node.a_given_b(
    # Lista de diccionarios
    #[   {'var': rain_bayesian_node.var, 'value': True}     ],
    # Lista de diccionarios
    #[   {'var': wet_grass_bayesian_node.var, 'value': True}    ])

#print wet_grass_bayesian_node.a_given_b(
    # Lista de diccionarios
    #[   {'var': rain_bayesian_node.var, 'value': False}, {'var': sprinkler_bayesian_node.var, 'value': False}     ],
    # Lista de diccionarios
    #[   {'var': wet_grass_bayesian_node.var, 'value': True}    ])

#nuestras consultas
#cambie la consulta a fraude dado que sucedio en una joyeria
#print jewelry_bayesian_node.a_given_b(
	# Lista de diccionarios
#	[   {'var': fraud_bayesian_node.var, 'value': True} 	],
	# Lista de diccionarios
#	[   {'var': jewelry_bayesian_node.var, 'value': True} 	])

#consulta: sucedio un fraude dado que fue un hombre en una joyeria
#print jewelry_bayesian_node.a_given_b(
	# Lista de diccionarios
#	[   {'var': fraud_bayesian_node.var, 'value': True}    ],
	# Lista de diccionarios
#	[   {'var': sex_bayesian_node.var, 'value': False}, {'var': jewelry_bayesian_node.var, 'value': True}    ])

#consulta: sucedio un fraude dado que fue una mujer y no fue en una joyeria
#print jewelry_bayesian_node.a_given_b(
	# Lista de diccionarios
#	[   {'var': fraud_bayesian_node.var, 'value': True}    ],
	# Lista de diccionrios
#	[   {'var': sex_bayesian_node.var, 'value': True}, {'var': jewelry_bayesian_node.var, 'value': False}    ])

#print jewelry_bayesian_node.a_given_b(
#	[	{'var': fraud_bayesian_node.var, 'value': True}    ],
#	[   {'var': sex_bayesian_node.var, 'value': False},{'var': jewelry_bayesian_node.var, 'value': True}])

#print FP_node.a_given_b(
#	[   {'var': FP_node.var, 'value': True}    ],
#	[   {'var': visit_asia_node.var, 'value': True},{'var': smoking_node.var, 'value': True},{'var': bronquitis_node.var, 'value': True},{'var': DY_node.var, 'value': True},{'var': XR_node.var, 'value': True},{'var': lung_cancer_node.var, 'value': True},{'var': tuberculosis_node.var, 'value': True}])

print tuberculosis_node.a_given_b(
	[{'var': visit_asia_node.var, 'value': True}],
	[{'var': smoking_node.var, 'value': True}])